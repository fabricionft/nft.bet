package nft.bet.repository;

import nft.bet.model.UsuarioModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<UsuarioModel, Long> {

    Optional<UsuarioModel> findByID(Long ID);
    Optional<UsuarioModel> findByCodigo(Long codigo);
    Optional<UsuarioModel> findByEmail(String email);
    Optional<UsuarioModel> findByCelular(String celular);
    Optional<UsuarioModel> findByCpf(String cpf);

    @Query(value = "select u from Usuario u inner join u.chaves c where c.cpfTitular = :cpf")
    Optional<UsuarioModel> buscarUsuarioPorCPFDeChavePix(String cpf);
}
