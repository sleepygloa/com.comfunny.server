package com.nambi.book.domain.ServerAPI;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ConnectLogRepository extends JpaRepository<ConnectLog, String> {

    @Query(value="INSERT INTO connect_log (id) VALUES (?1)", nativeQuery = true)
    void insert(String id);

}
