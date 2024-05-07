package com.comfunny.server.proj.sd.repository;

import com.comfunny.server.proj.sd.domain.Client;
import com.comfunny.server.proj.sd.domain.ClientPk;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClientRepository extends JpaRepository<Client, ClientPk> {

}
