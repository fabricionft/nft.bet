package nft.bet.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Table(name = "usuarios")
@Getter
@Setter
@Entity(name = "Usuario")
public class UsuarioModel implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long codigo;

    private Long ID;
    private String role = "ROLE_USER";
    private String dataCadastro;
    private Boolean contaAtiva = true;
    private String nomeCompleto;
    private String email;
    private String senha;
    private String celular;
    private String cpf;
    private Double saldo = 0.0;
    private Double saldoEmRetirada = 0.0;
    private Double auditoria = 0.0;
    private Integer nivel = 1;
    private Integer pontosAdquiridos = 0;
    private Integer pontosNecessariosParaProximoNivel = 100;

    private Long convite;
    private Integer quantidadeDeUsuariosConvidados = 0;
    private Double ganhosComConvite = 0.0;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "bonus_id")
    private List<BonusModel> bonusUsados = new ArrayList<>();

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "chavcs_id")
    private List<ChavePixModel> chaves = new ArrayList<>();

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "depositos_id")
    private List<DepositoModel> historicoDepositos = new ArrayList<>();

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "saques_id")
    private List<SaqueModel> historicoSaques = new ArrayList<>();

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role));
    }

    @Override
    public String getPassword() {
        return senha;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
