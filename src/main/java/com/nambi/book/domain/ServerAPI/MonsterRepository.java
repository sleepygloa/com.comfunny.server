package com.nambi.book.domain.ServerAPI;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MonsterRepository extends JpaRepository<Monster, Integer> {

    @Query(value = "SELECT p FROM Monster p")
    List<Monster> findAll();
}
