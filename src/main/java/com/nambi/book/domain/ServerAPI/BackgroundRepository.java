package com.nambi.book.domain.ServerAPI;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BackgroundRepository extends JpaRepository<Background, Integer> {

    @Query(value = "SELECT p FROM Background p")
    List<Background> findAll();
}
