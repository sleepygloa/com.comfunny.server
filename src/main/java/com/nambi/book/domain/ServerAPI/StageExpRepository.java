package com.nambi.book.domain.ServerAPI;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface StageExpRepository extends JpaRepository<StageExp, Integer> {

    @Query(value = "SELECT p FROM StageExp p")
    List<StageExp> findAll();
}
