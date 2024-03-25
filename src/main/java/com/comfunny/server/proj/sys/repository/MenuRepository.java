package com.comfunny.server.proj.sys.repository;

import com.comfunny.server.proj.sys.domain.Menu;
import org.apache.ibatis.annotations.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface MenuRepository extends JpaRepository<Menu, String>{

    @Query("SELECT m FROM Menu m ORDER BY m.menuParentSeq, (m.menuPk.menuSeq+0)")
    List<Menu> findAllByTree();

    @Query("SELECT m FROM Menu m ORDER BY m.menuParentSeq, (m.menuPk.menuSeq+0)")
    List<Map> findAllByTree2();

    //자식 메뉴들을 조회
    @Query(value="select m from Menu m where m.menuPk.bizCd = :bizCd and m.menuParentSeq = :menuParentSeq")
    List<Menu> findAllBizCdAndMenuParentSeq(@Param("bizCd") String bizCd, @Param("menuParentSeq") int menuParentSeq);

    @Query(value="select case when Max(m.menuPk.menuSeq) is null then 0 else Max(m.menuPk.menuSeq) end as menuSeq from Menu m")
    int findOneMaxMenuSeq();

}
