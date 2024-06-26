package com.comfunny.server.proj.sd.repository;

import com.comfunny.server.proj.sd.domain.Item;
import com.comfunny.server.proj.sd.domain.ItemPk;
import com.comfunny.server.proj.sd.domain.Zone;
import com.comfunny.server.proj.sd.domain.ZonePk;
import org.apache.ibatis.annotations.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ItemRepository extends JpaRepository<Item, ItemPk> {


}
