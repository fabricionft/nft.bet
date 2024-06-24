package nft.bet.service;

import nft.bet.model.DepositoModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import nft.bet.dto.request.DepositoRequestDTO;
import nft.bet.exception.RequestException;
import nft.bet.model.BonusModel;
import nft.bet.model.UsuarioModel;
import nft.bet.repository.BonusRepository;
import nft.bet.repository.DepositoRepository;
import nft.bet.repository.UsuarioRepository;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

@Service
public class DepositoService {

    @Autowired
    private DepositoRepository depositoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private BonusRepository bonusRepository;


    public List<DepositoModel> listarDepositos(){
        return depositoRepository.findAll();
    }

    public List<DepositoModel> listarDepositosPorStatus(String status){
        return depositoRepository.listarDepositosPorStatus(status);
    }

    public DepositoModel buscarDepositoPorCodigo(Long codigo){
        return depositoRepository.findByCodigo(codigo)
               .orElseThrow(() -> new RequestException("Depósito inexistente!"));
    }

    public UsuarioModel solicitarDeposito(DepositoRequestDTO depositoRequest){
        if(depositoRequest.getValorDeposito() < 5)
            throw new RequestException("Desculpe, você só pode solicitar um depósito com valor igual ou superior à 5 reais!");

        UsuarioModel usuario = buscarUsuarioPorCodigo(depositoRequest.getCodigoUsuario());
        Double valorComBonus = 0.0;
        Double auditoria = 0.0;
        Integer multiplicadorAuditoria = 1;

        if(!depositoRequest.getCodigoBonus().equals(0) && depositoRequest.getCodigoBonus().toString().length() == 4) {
            BonusModel bonus = verificarValidadeDoCodigoBonus(depositoRequest.getCodigoBonus(), "deposito");

            if(usuario.getBonusUsados().contains(bonus))
                throw new RequestException("Desculpe, você já usou este código bônus anteriormente! Cada código bônus só pode ser usado uma vez por cada usuário.");

            valorComBonus = depositoRequest.getValorDeposito() + (depositoRequest.getValorDeposito() * bonus.getPercentualBonus() / 100);
            auditoria = valorComBonus * bonus.getMultiplicadorDeAuditoria();
            multiplicadorAuditoria = bonus.getMultiplicadorDeAuditoria();

            usuario.getBonusUsados().add(bonus);
        }else {
            valorComBonus = depositoRequest.getValorDeposito();
            auditoria = depositoRequest.getValorDeposito();
        }

        usuario.getHistoricoDepositos().add(new DepositoModel(
            null,
            usuario.getEmail(),
            new SimpleDateFormat("dd/MM/yyyy HH:mm:ss").format(Calendar.getInstance().getTime()),
            "Solicitado",
            depositoRequest.getValorDeposito(),
            valorComBonus,
            auditoria,
            multiplicadorAuditoria,
            depositoRequest.getCodigoBonus(),
            ""
        ));

        return usuarioRepository.save(usuario);
    }

    public DepositoModel autorizarDeposito(DepositoModel deposito){
        UsuarioModel usuario = buscarUsuarioPorEmail(deposito.getEmail());

        if(!usuario.getConvite().equals(0L)
           && depositoRepository.buscarDepositosBemSucedidosDeUmUsuario(usuario.getCodigo()).size() == 0
           && deposito.getValorDeposito() >= 20){
            UsuarioModel usuarioConvidador = buscarUsuarioPorID(usuario.getConvite());

            usuarioConvidador.setSaldo(usuarioConvidador.getSaldo() + 20.0);
            usuarioConvidador.setAuditoria(usuarioConvidador.getAuditoria() + 20.0);
            usuarioConvidador.setQuantidadeDeUsuariosConvidados(usuarioConvidador.getQuantidadeDeUsuariosConvidados() + 1);
            usuarioConvidador.setGanhosComConvite(usuarioConvidador.getGanhosComConvite() + 20.0);
        }

        usuario.setSaldo(usuario.getSaldo() + deposito.getValorComBonus());
        usuario.setAuditoria(usuario.getAuditoria() + deposito.getAuditoriaNecessaria());

        deposito.setStatusDeposito("Concluído");

        usuarioRepository.save(usuario);
        return depositoRepository.save(deposito);
    }

    public DepositoModel recusarDeposito(DepositoModel deposito){
        deposito.setStatusDeposito("Recusado");
        deposito.setMotivoRejeicao(deposito.getMotivoRejeicao());

        return  depositoRepository.save(deposito);
    }


    //Métodos privados
    private UsuarioModel buscarUsuarioPorCodigo(Long codigo){
        return  usuarioRepository.findByCodigo(codigo)
                .orElseThrow(() -> new RequestException("Usuário inexistente!"));
    }

    private UsuarioModel buscarUsuarioPorID(Long id){
        return  usuarioRepository.findByID(id)
                .orElseThrow(() -> new RequestException("Usuário inexistente!"));
    }

    private UsuarioModel buscarUsuarioPorEmail(String email){
        return  usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new RequestException("Usuário inexistente!"));
    }

    private BonusModel buscarBonusPorCodigoDeBonus(Integer codigoBonus){
        return bonusRepository.findByCodigoBonus(codigoBonus)
                .orElseThrow(() -> new RequestException("Bônus inexistente!"));
    }

    private BonusModel verificarValidadeDoCodigoBonus(Integer codigoBonus, String acao){
        BonusModel bonus = buscarBonusPorCodigoDeBonus(codigoBonus);

        if(bonus.getDataValidade().compareTo(new Date()) == -1)
            throw new RequestException("Desculpe, este código de bônus expirou! Para prosseguir altere ou remova o mesmo.");

        if(!bonus.getTipo().equals(acao))
            throw new RequestException("Desculpe, este não é um bonûs válido para "+acao+"!");

        return bonus;
    }
}
