package com.nambi.book.domain.ServerAPI;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ItemReinforceRepository extends JpaRepository<ItemReinforce, Integer> {

    @Query(value = "SELECT p FROM ItemReinforce p")
    List<ItemReinforce> findAll();
}
