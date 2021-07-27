package com.nambi.book.domain.ServerAPI;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ExpRepository extends JpaRepository<Exp, Integer> {

    @Query(value = "SELECT p FROM Exp p")
    List<Exp> findAll();
}
