package com.example.booking.repository;

import com.example.booking.model.Checkout;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CheckoutRepository extends JpaRepository<Checkout, Long> {
    List<Checkout> findAllByOrderByIdDesc();

    @Modifying
    @Query(
            value = "UPDATE checkout c SET c.status = ? WHERE c.id = ?",
            nativeQuery = true)
    int updateStatusCheckout(Integer status, Long checkoutId);

    @Query(
            value = "SELECT * FROM checkout c WHERE c.status = 1 ORDER BY c.id DESC",
            nativeQuery = true)
    List<Checkout> findAllActiveCheckouts();

    @Query(
            value = "SELECT * FROM checkout c WHERE c.status = 0 ORDER BY c.id DESC",
            nativeQuery = true)
    List<Checkout> findAllInactiveCheckouts();
}
