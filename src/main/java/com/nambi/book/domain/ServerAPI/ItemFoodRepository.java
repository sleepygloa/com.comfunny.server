package com.nambi.book.domain.ServerAPI;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ItemFoodRepository extends JpaRepository<ItemFood, Integer> {

    @Query(value = "SELECT p FROM ItemFood p")
    List<ItemFood> findAll();
}
