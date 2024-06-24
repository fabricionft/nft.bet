package nft.bet.service;

import nft.bet.dto.request.ChavePixRequestDTO;
import nft.bet.exception.RequestException;
import nft.bet.model.ChavePixModel;
import nft.bet.model.UsuarioModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import nft.bet.repository.ChavePixRepository;
import nft.bet.repository.UsuarioRepository;

import java.util.List;

@Service
public class ChavePixService {

    @Autowired
    private ChavePixRepository chavePixRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;


    public List<ChavePixModel> buscarChavesDeUmUsuário(Long codigoUsuario){
        return  chavePixRepository.buscarChavesPorCodigoDeUsuario(codigoUsuario);
    }

    public UsuarioModel salvarChaveParaUmUSuario(ChavePixRequestDTO chavePixRequest){
        UsuarioModel usuario = buscarUsuarioPorCodigo(chavePixRequest.getCodigoUsuario());

        if(chavePixRepository.findByChave(chavePixRequest.getChave()).isPresent())
            throw new RequestException("Desculpe, outro usuário já vinculou esta chave");

        if(usuarioRepository.buscarUsuarioPorCPFDeChavePix(chavePixRequest.getCpfTitular()).isPresent())
            throw new RequestException("Desculpe, outro usuário já vinculou uma chave deste mesmo titular!");

        if(usuario.getChaves().size() == 3)
            throw new RequestException("Desculpe, você só pode cadastrar 3 chaves!");

        usuario.getChaves().add(new ChavePixModel(
            null,
            chavePixRequest.getNomeTitular(),
            chavePixRequest.getTipoChave(),
            chavePixRequest.getChave(),
            chavePixRequest.getCpfTitular()
        ));

        return usuarioRepository.save(usuario);
    }

    //Metódos privados
    public UsuarioModel buscarUsuarioPorCodigo(Long codigo){
        return  usuarioRepository.findByCodigo(codigo)
                .orElseThrow(() -> new RequestException("Usuário inexistente"));
    }
}
