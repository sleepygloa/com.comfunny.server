package com.comfunny.server.proj.sd.repository;

import com.comfunny.server.proj.sd.domain.Biz;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BizRepository extends JpaRepository<Biz, String> {
}
