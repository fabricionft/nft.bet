package nft.bet.repository;

import nft.bet.model.DepositoModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DepositoRepository extends JpaRepository<DepositoModel, Long> {

    @Query(value = "select d from Deposito d where d.statusDeposito = :status")
    List<DepositoModel> listarDepositosPorStatus(String status);

    Optional<DepositoModel> findByCodigo(Long codigo);

    @Query(value = "select u.historicoDepositos from Usuario u inner join u.historicoDepositos d where u.codigo = :codigoUsuario and d.statusDeposito = 'Concluído'")
    List<DepositoModel> buscarDepositosBemSucedidosDeUmUsuario(Long codigoUsuario);
}
