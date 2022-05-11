package com.example.booking.controller;

import com.example.booking.model.Checkout;
import com.example.booking.model.CheckoutProduct;
import com.example.booking.repository.CheckoutProductRepository;
import com.example.booking.repository.CheckoutRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@Log4j2
@RequiredArgsConstructor
@RequestMapping("/api/checkout")
public class CheckoutController {
    @Autowired
    private CheckoutRepository checkoutRepository;

    @Autowired
    private CheckoutProductRepository checkoutProductRepository;

    @GetMapping("/list")
    public ResponseEntity<List<Checkout>> index() {
        return ResponseEntity.ok(checkoutRepository.findAllByOrderByIdDesc());
    }

    @GetMapping
    public ResponseEntity<List<Checkout>> getListNotDelivered() {
        return ResponseEntity.ok(checkoutRepository.findAllInactiveCheckouts());
    }

    @GetMapping("/delivered")
    public ResponseEntity<List<Checkout>> getListDelivered() {
        return ResponseEntity.ok(checkoutRepository.findAllActiveCheckouts());
    }

    @GetMapping("/detail/{checkoutId}")
    public ResponseEntity<List<CheckoutProduct>> detail(@PathVariable Long checkoutId) {
        List<CheckoutProduct> checkoutProducts = checkoutProductRepository.findAllByCheckout_id(checkoutId);
        return ResponseEntity.ok(checkoutProducts);
    }

    @PostMapping()
    public ResponseEntity<Checkout> save(@RequestBody Checkout checkout) {
        checkout.setCheckoutId(UUID.randomUUID().toString());
        return ResponseEntity.ok(checkoutRepository.save(checkout));
    }

    @PostMapping("/details")
    public ResponseEntity<List<CheckoutProduct>> saveDetail(@RequestBody List<CheckoutProduct> checkoutProducts) {
        return ResponseEntity.ok(checkoutProductRepository.saveAll(checkoutProducts));
    }

    @PutMapping("/status/{checkoutId}")
    @Transactional
    public ResponseEntity<Integer> updateStateCheckout(@PathVariable Long checkoutId, @RequestParam Integer status) {
        log.info("==============updateStateCheckout==========");
        log.info("Checkout ID: " + checkoutId);
        log.info("Status: " + status);
        return ResponseEntity.ok(checkoutRepository.updateStatusCheckout(status, checkoutId));
    }

}
