package nft.bet.repository;

import nft.bet.model.JogoModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface JogoRepository extends JpaRepository<JogoModel, Long> {

    Optional<JogoModel> findByCodigo(Long codigo);
}
