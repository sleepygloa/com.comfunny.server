package com.comfunny.server.proj.sd.repository;

import com.comfunny.server.proj.sd.domain.Supplier;
import com.comfunny.server.proj.sd.domain.SupplierPk;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SupplierRepository extends JpaRepository<Supplier, SupplierPk> {

}
