package com.nambi.book.domain.ServerAPI;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ItemRepository extends JpaRepository<Item, Integer> {

    @Query(value = "SELECT p FROM Item p")
    List<Item> findAll();
}
