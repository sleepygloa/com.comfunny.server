package com.nambi.book.domain.ServerAPI;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface InitCharStatRepository extends JpaRepository<InitCharStat, Integer> {

    @Query(value = "SELECT p FROM InitCharStat p")
    List<InitCharStat> findAll();
}
