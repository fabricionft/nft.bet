package nft.bet.service;

import nft.bet.dto.request.RecuperarSenhaRequestDTO;
import nft.bet.model.UsuarioModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import nft.bet.dto.request.AlterarSenhaRequestDTO;
import nft.bet.dto.request.LoginAdminRequestDTO;
import nft.bet.dto.request.LoginRequestDTO;
import nft.bet.dto.response.LoginAdminResponsetDTO;
import nft.bet.exception.RequestException;
import nft.bet.model.BonusModel;
import nft.bet.model.ConfirmacaoModel;
import nft.bet.repository.BonusRepository;
import nft.bet.repository.ConfirmacaoRepository;
import nft.bet.repository.UsuarioRepository;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private BonusRepository bonusRepository;

    @Autowired
    private PasswordEncoder encoder;

    @Autowired
    private TokenService tokenService;

    @Autowired
    private ConfirmacaoRepository confirmacaoRepository;

    @Autowired
    private JavaMailSender mailSender;

    @Value("${senha.sistema}")
    private String senhaSistema;

    @Value("${senha.login.admin}")
    private String senhaLoginAdmin;


    public List<UsuarioModel> listarUsuarios(){
        return  usuarioRepository.findAll();
    }

    public UsuarioModel buscarUsuarioPorCodigo(Long codigo){
        return  usuarioRepository.findByCodigo(codigo)
                .orElseThrow(() -> new RequestException("Usuário inexistente!"));
    }

    public UsuarioModel buscarUsuarioPorID(Long id){
        return  usuarioRepository.findByID(id)
                .orElseThrow(() -> new RequestException("Usuário inexistente!"));
    }

    public Double buscarSaldoDeUmUsuarioPorCodigo(Long codigo){
        return buscarUsuarioPorCodigo(codigo).getSaldo();
    }

    public ConfirmacaoModel solicitarCodigoDeConfirmacao(String email, Boolean recuperar) {
        Integer codigo = ((int)(Math.random() * 8999) + 1000);
        email = email.trim();

        if(recuperar.equals(true) && usuarioRepository.findByEmail(email).isEmpty())
            throw  new RequestException("Desculpe, não existe nenhum usuário com este email!");

        if(enviarEmailComCodigo(email, codigo, (recuperar) ? "Recuperação de senha" : "Cadastro", (recuperar) ? "recuperação" : "confirmação")){
            if(confirmacaoRepository.findByEmail(email).isEmpty()){
                ConfirmacaoModel confirmacao = new ConfirmacaoModel(
                    null,
                    email,
                    codigo
                );
                return confirmacaoRepository.save(confirmacao);
            }else{
                ConfirmacaoModel confirmacao = buscarConfirmacaoPorEmail(email);
                confirmacao.setConfirmacao(codigo);
                return  confirmacaoRepository.save(confirmacao);
            }
        }else throw new RequestException("Erro ao colicitar código!");
    }

    public UsuarioModel salvarUsuario(UsuarioModel usuario, Integer codigoBonus, Integer confirmacao){
       verificarSeOsDadosDoUsuarioNaoSeRepetem(usuario);

       if(!codigoBonus.equals(0) && codigoBonus.toString().length() == 4) {
           BonusModel bonus = verificarValidadeDoCodigoBonus(codigoBonus, "cadastro");
           usuario.setSaldo(bonus.getValorBonus());
           usuario.setAuditoria(bonus.getValorBonus() * bonus.getMultiplicadorDeAuditoria());
           usuario.getBonusUsados().add(bonus);
       }

       if(!usuario.getConvite().equals(0L) && usuario.getConvite().toString().length() == 9){
           if(usuarioRepository.findByID(usuario.getConvite()).isEmpty())
               throw new RequestException("Não existe nenhum usuário com este código de convie! Altere ou apague o conteúdo deste campo para prosseguir");
       } else usuario.setConvite(0L);

       usuario.setDataCadastro(new SimpleDateFormat("dd/MM/yyyy HH:mm:ss").format(Calendar.getInstance().getTime()));
       usuario.setID(gerarIDSemRepeticao());
       usuario.setSenha(encoder.encode(usuario.getSenha()));

       if(buscarConfirmacaoPorEmail(usuario.getEmail()).getConfirmacao().equals(confirmacao)){
           return usuarioRepository.save(usuario);
       }else throw  new RequestException("Código de confirmação incorreto!");
    }

    public UsuarioModel fazerLogin(LoginRequestDTO loginRequest){
        if(verificarSenha(loginRequest.getEmail(), loginRequest.getSenha())){
            UsuarioModel usuario = buscarUsarioPorEmail(loginRequest.getEmail());

            if(usuario.getContaAtiva().equals(false))
                throw new RequestException("Desculpe, você não pode fazer login, sua conta foi desativada por um administrador");

            return usuario;
        }else throw new RequestException("Senha incorreta");
    }

    public LoginAdminResponsetDTO fazerLoginComoAdmin(LoginAdminRequestDTO loginAdminRequest){
        if(!encoder.matches(loginAdminRequest.getSenhaSistema(), senhaLoginAdmin))
            throw new RequestException("Senha do sistema incorreta!");

        if(verificarSenha(loginAdminRequest.getEmail(), loginAdminRequest.getSenha())){
            UsuarioModel usuario = buscarUsarioPorEmail(loginAdminRequest.getEmail());
            if(!usuario.getRole().equals("ROLE_ADMIN"))
                throw new RequestException("Desculpe, sua conta não possui autorização ADMIN!");

            return new LoginAdminResponsetDTO(
                usuario.getRole(),
                tokenService.gerarToken(usuario.getEmail())
            );
        }else throw new RequestException("Senha incorreta");
    }

    public String recuperarSenhaUsuario(RecuperarSenhaRequestDTO recuperarSenhaRequest){
        UsuarioModel usuario = buscarUsarioPorEmail(recuperarSenhaRequest.getEmail());
        ConfirmacaoModel confirmacao = buscarConfirmacaoPorEmail(usuario.getEmail());

        if(confirmacao.getConfirmacao().equals(recuperarSenhaRequest.getConfirmacao())){
            usuario.setSenha(encoder.encode(recuperarSenhaRequest.getNovaSenha()));
            usuarioRepository.save(usuario);
            return "Senha alterada com sucesso!";
        }else throw  new RequestException("Código de confirmação incorreto!");
    }

    public UsuarioModel alterarRoleUsuario(Long codigo, String senha){
        if(encoder.matches(senha, senhaSistema)){
            UsuarioModel usuario = buscarUsuarioPorCodigo(codigo);
            usuario.setRole("ROLE_ADMIN");
            return usuarioRepository.save(usuario);
        }
        throw new RequestException("Senha do sistema incorreta!");
    }

    public String alterarSenhaUsuario(AlterarSenhaRequestDTO alterarSenhaRequest){
        if(verificarSenha(alterarSenhaRequest.getEmail(), alterarSenhaRequest.getSenha())){
            UsuarioModel usuario = buscarUsarioPorEmail(alterarSenhaRequest.getEmail());
            usuario.setSenha(encoder.encode(alterarSenhaRequest.getNovaSenha()));
            usuarioRepository.save(usuario);
            return "Senha alterada com sucesso!";
        }else throw new RequestException("Senha atual incorreta!");
    }

    public String alterarStatusUsuario(Long codigo){
        UsuarioModel usuario = buscarUsuarioPorCodigo(codigo);

        usuario.setContaAtiva((usuario.getContaAtiva()) ? false : true);
        usuarioRepository.save(usuario);

        return (usuario.getContaAtiva()) ? "ativada" : "desativada";
    }

    
    //Metódos privados
    private UsuarioModel buscarUsarioPorEmail(String email){
        return usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new RequestException("usuário inexistente!"));
    }

    private BonusModel buscarBonusPorCodigoDeBonus(Integer codigoBonus){
        return bonusRepository.findByCodigoBonus(codigoBonus)
               .orElseThrow(() -> new RequestException("Bônus inexistente!"));
    }

    private ConfirmacaoModel buscarConfirmacaoPorEmail(String email){
        return confirmacaoRepository.findByEmail(email)
                .orElseThrow(() -> new RequestException("Código de confirmação inexistente!"));
    }

    private Long gerarIDSemRepeticao(){
        Long numero = ((long)(Math.random() * 899999999) + 100000000);
        while(usuarioRepository.findByID(numero).isPresent())
            numero = ((long)(Math.random() * 899999999) + 100000000);

        return numero;
    }

    private BonusModel verificarValidadeDoCodigoBonus(Integer codigoBonus, String acao){
        BonusModel bonus = buscarBonusPorCodigoDeBonus(codigoBonus);

        if(bonus.getDataValidade().compareTo(new Date()) == -1)
            throw new RequestException("Desculpe, este código de bônus expirou! Para prosseguir altere ou remova o mesmo.");

        if(!bonus.getTipo().equals(acao))
            throw new RequestException("Desculpe, este não é um bonûs válido para "+acao+"!");

        return bonus;
    }

    private Boolean verificarSenha(String email, String senha){
        UsuarioModel usuario = buscarUsarioPorEmail(email);
        return encoder.matches(senha, usuario.getSenha());
    }

    private void verificarSeOsDadosDoUsuarioNaoSeRepetem(UsuarioModel usuario){
        if(usuarioRepository.findByEmail(usuario.getEmail()).isPresent())
            throw new RequestException("Desculpe, este email já está sendo utilizado!");

        if(usuarioRepository.findByCelular(usuario.getCelular()).isPresent())
            throw new RequestException("Desculpe, este número de celular já está vinculado em outra conta!");

        if(usuarioRepository.findByCpf(usuario.getCpf()).isPresent())
            throw new RequestException("Desculpe, este CPF já está vinculado em outra conta!");
    }

    private Boolean enviarEmailComCodigo(String email, Integer codigo, String cabecalho, String acao){
        SimpleMailMessage message = new SimpleMailMessage();

        message.setTo(email);
        message.setSubject(String.format(cabecalho));
        message.setText("O seu código de "+acao+" é: "+codigo);

        try {
            mailSender.send(message);
            return true;
        } catch (Exception e) {
            throw new RequestException("Erro ao enviar o código de confirmação para o email informado!");
        }
    }
}
