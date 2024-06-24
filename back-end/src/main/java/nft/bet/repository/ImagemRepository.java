package nft.bet.repository;

import nft.bet.model.ImagemModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ImagemRepository extends JpaRepository<ImagemModel, Long> {

    Optional<ImagemModel> findByCodigo(Long codigo);
}
