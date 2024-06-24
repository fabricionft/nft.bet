package nft.bet.repository;

import nft.bet.model.ConfirmacaoModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ConfirmacaoRepository extends JpaRepository<ConfirmacaoModel, Long> {

    Optional<ConfirmacaoModel> findByEmail(String email);
}
