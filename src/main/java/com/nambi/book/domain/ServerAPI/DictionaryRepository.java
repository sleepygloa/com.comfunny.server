package com.nambi.book.domain.ServerAPI;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface DictionaryRepository extends JpaRepository<Dictionary, Integer> {

    @Query(value = "SELECT p FROM Dictionary p")
    List<Dictionary> findAll();
}
