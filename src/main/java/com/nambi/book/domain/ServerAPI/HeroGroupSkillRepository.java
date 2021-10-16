package com.nambi.book.domain.ServerAPI;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface HeroGroupSkillRepository extends JpaRepository<HeroGroupSkill, Integer> {

    @Query(value = "SELECT p FROM HeroGroupSkill p")
    List<HeroGroupSkill> findAll();
}
