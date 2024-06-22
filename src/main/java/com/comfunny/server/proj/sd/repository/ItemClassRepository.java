package com.comfunny.server.proj.sd.repository;

import com.comfunny.server.proj.sd.domain.Item;
import com.comfunny.server.proj.sd.domain.ItemClass;
import com.comfunny.server.proj.sd.domain.ItemClassPk;
import com.comfunny.server.proj.sd.domain.ItemPk;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemClassRepository extends JpaRepository<ItemClass, ItemClassPk> {

}
