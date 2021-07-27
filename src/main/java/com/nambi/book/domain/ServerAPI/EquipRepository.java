package com.nambi.book.domain.ServerAPI;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface EquipRepository extends JpaRepository<Equip, Integer> {

    @Query(value = "SELECT p FROM Equip p")
    List<Equip> findAll();
}
