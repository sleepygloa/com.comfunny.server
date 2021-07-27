package com.nambi.book.domain.ServerAPI;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ItemPotionRepository extends JpaRepository<ItemPotion, Integer> {

    @Query(value = "SELECT p FROM ItemPotion p")
    List<ItemPotion> findAll();
}
