package com.nambi.book.domain.ServerAPI;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface DropChanceRepository extends JpaRepository<DropChance, Integer> {

    @Query(value = "SELECT p FROM DropChance p")
    List<DropChance> findAll();
}
