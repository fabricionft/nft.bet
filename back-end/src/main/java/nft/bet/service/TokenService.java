package nft.bet.service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneOffset;

@Service
public class TokenService {

    public String gerarToken(String email){
        return JWT.create()
                .withIssuer("Jogos")
                .withSubject(email)
                .withExpiresAt(LocalDateTime.now()
                        .plusDays(1)
                        .toInstant(ZoneOffset.of("-03:00"))
                ).sign(Algorithm.HMAC256("patosbet"));
    }

    public String getSubject(String token) {
        return JWT.require(Algorithm.HMAC256("patosbet"))
                .withIssuer("Jogos")
                .build().verify(token).getSubject();
    }
}
