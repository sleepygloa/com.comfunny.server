package com.comfunny.server.proj.sd.repository;

import com.comfunny.server.proj.sd.domain.ItemClass;
import com.comfunny.server.proj.sd.domain.ItemClassPk;
import com.comfunny.server.proj.sd.domain.ItemUom;
import com.comfunny.server.proj.sd.domain.ItemUomPk;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemUomRepository extends JpaRepository<ItemUom, ItemUomPk> {

}
