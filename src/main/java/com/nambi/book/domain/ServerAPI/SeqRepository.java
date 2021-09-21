package com.nambi.book.domain.ServerAPI;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface SeqRepository extends JpaRepository<Seq, String> {

    Seq findByCodeAndYyyymmdd(String code, String yyyymmdd);

    @Modifying(clearAutomatically = true, flushAutomatically = true)
    @Query(value="INSERT INTO seq (code, yyyymmdd, count) VALUES (?1, ?2, ?3)", nativeQuery = true)
    int insertCount(String code, String yyyymmdd, Long count);

    @Modifying(clearAutomatically = true, flushAutomatically = true)
    @Query(value="UPDATE seq SET count = ?3 WHERE code = ?1 AND yyyymmdd = ?2", nativeQuery = true)
    int updateCount(String code, String yyyymmdd, Long count);
}
