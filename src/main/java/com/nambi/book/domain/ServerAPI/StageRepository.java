package com.nambi.book.domain.ServerAPI;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface StageRepository extends JpaRepository<Stage, Integer> {

    @Query(value = "SELECT p FROM Stage p")
    List<Stage> findAll();
}
