package com.nambi.book.domain.ServerAPI;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AchievementRepository extends JpaRepository<Achievement, Integer> {

    @Query(value = "SELECT p FROM Achievement p ORDER BY p.codeGroupCd, p.order")
    List<Achievement> findAll();
}
