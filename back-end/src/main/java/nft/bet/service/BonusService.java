package nft.bet.service;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import nft.bet.dto.request.BonusRequestDTO;
import nft.bet.exception.RequestException;
import nft.bet.model.BonusModel;
import nft.bet.repository.BonusRepository;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Service
public class BonusService {

    @Autowired
    private BonusRepository bonusRepository;

    @Autowired
    private ModelMapper modelMapper;


    public List<BonusModel> listarBonus(){
        return  bonusRepository.findAll();
    }

    public BonusModel buscarBonusPorCodigo(Long codigo){
        return  bonusRepository.findByCodigo(codigo)
                .orElseThrow(() -> new RequestException("Bônus inexistente!"));
    }

    public BonusModel criarBonus(BonusRequestDTO bonusRequest){
        BonusModel bonus = new BonusModel(
            null,
            gerarCodigoBonusSemRepeticao(),
            bonusRequest.getTipo(),
            (bonusRequest.getTipo().equals("cadastro")) ? bonusRequest.getValorBonus() : 0,
            (bonusRequest.getTipo().equals("deposito")) ? bonusRequest.getPercentualBonus() : 0,
            bonusRequest.getMultiplicadorDeAuditoria(),
            converterData(bonusRequest.getDataValidade())
        );

        return bonusRepository.save(bonus);
    }

    public BonusModel editarBonus(BonusRequestDTO bonusRequest){
        BonusModel bonus  = modelMapper.map(bonusRequest, BonusModel.class);
        bonus.setCodigoBonus(buscarBonusPorCodigo(bonusRequest.getCodigo()).getCodigoBonus());
        bonus.setDataValidade(converterData(bonusRequest.getDataValidade()));

        return bonusRepository.save(bonus);
    }

    public String excluirTodosBonus(){
        bonusRepository.deleteAll();
        return "Todos bonûs foram excluídos!";
    }

    public String excluirBonusPorCodigo(Long codigo){
        BonusModel bonus = buscarBonusPorCodigo(codigo);
        bonusRepository.delete(bonus);
        return "Bônus deletado com sucesso!";
    }


    //Métodos privados
    private Date converterData(String data){
        Date dataConvertida;

        try {
            dataConvertida = new SimpleDateFormat("yyyy-MM-dd").parse(data);
        } catch (ParseException e) {
            throw new RuntimeException(e);
        }

        if(dataConvertida.compareTo(new Date()) == -1)
            throw new RequestException("A data de validade precisa ser ao menos um dia a frente do atual!");

        return dataConvertida;
    }

    private Integer gerarCodigoBonusSemRepeticao(){
        Integer numero = ((int)(Math.random() * 8999) + 1000);
        while(bonusRepository.findByCodigoBonus(numero).isPresent())
            numero = ((int)(Math.random() * 8999) + 1000);

        return numero;
    }

}
