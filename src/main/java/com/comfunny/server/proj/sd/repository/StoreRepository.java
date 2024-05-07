package com.comfunny.server.proj.sd.repository;

import com.comfunny.server.proj.sd.domain.Store;
import com.comfunny.server.proj.sd.domain.StorePk;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StoreRepository extends JpaRepository<Store, StorePk> {

}
