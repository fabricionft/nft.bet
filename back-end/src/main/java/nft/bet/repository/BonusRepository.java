package nft.bet.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import nft.bet.model.BonusModel;

import java.util.Optional;

@Repository
public interface BonusRepository extends JpaRepository<BonusModel, Long> {

    Optional<BonusModel> findByCodigo(Long codigo);
    Optional<BonusModel> findByCodigoBonus(Integer codigoBonus);
}
