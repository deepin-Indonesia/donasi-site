---
layout: default
title: Donasi
description: Dukung pengembangan komunitas deepin Indonesia. Donasi Anda membantu menjaga server, mengadakan event, dan membuat konten untuk ekosistem deepin di Indonesia.
permalink: /
---

<!-- Hero -->
<section class="download-hero">
  <div class="container">
    <img src="{{ '/assets/images/deepin-id.png' | relative_url }}" alt="deepin" class="dl-hero-logo" width="112" height="112">
    <h1>Donasi <strong>deepin</strong> Indonesia</h1>
    <p class="donasi-hero-sub">Dukung kami untuk terus berkembang</p>
  </div>
</section>

<!-- Payment Section -->
<section class="donasi-payment">
  <div class="container">
    <div class="donasi-card">
      <div class="donasi-card__info">
        <span class="headline-badge">
          <i class="fas fa-heart"></i> DONASI
        </span>
        <h2>Bantu Kami Berkembang</h2>
        <p>
          Komunitas deepin Indonesia dijalankan sepenuhnya oleh <strong>relawan</strong>. 
          Donasi Anda digunakan untuk operasional server, event komunitas, pembuatan konten edukasi, 
          dan pengembangan ekosistem deepin di Indonesia.
        </p>
        <div class="donasi-notes">
          <p><i class="fas fa-info-circle"></i> Nama, email, dan nomor HP bersifat <strong>opsional</strong>. Jika diisi, identitas Anda akan ditampilkan bersama donasi. Jika dikosongkan, donasi dianggap <strong>anonim</strong>.</p>
        </div>
      </div>
      <div class="donasi-card__payment">
        <div class="donasi-payment-wrapper">
          <iframe 
            src="https://app.midtrans.com/payment-links/Donasi-deepin-Indonesia-qSHW6Bup" 
            title="Form Donasi deepin Indonesia via Midtrans"
            width="100%" 
            height="600"
            frameborder="0"
            loading="lazy"
            allow="payment"
            style="border-radius: var(--radius-md);">
          </iframe>
        </div>
        <p class="donasi-direct-link">
          <i class="fas fa-external-link-alt"></i> 
          Tidak bisa memuat form? <a href="https://app.midtrans.com/payment-links/Donasi-deepin-Indonesia-qSHW6Bup" target="_blank" rel="noopener">Buka di tab baru</a>
        </p>
      </div>
    </div>
  </div>
</section>

<!-- Top Donors -->
{% if site.data.donors %}
<section class="donasi-donors">
  <div class="container">
    {% assign top_donors = site.data.donors | sort: "amount" | reverse %}
    
    {% if top_donors.size > 0 %}
    <div class="section-header">
      <h2><i class="fas fa-trophy" style="color: #f59e0b;"></i> Top Donatur</h2>
      <p class="section-subtitle">Terima kasih kepada para donatur yang telah mendukung kami.</p>
    </div>
    <div class="donor-grid">
      {% for donor in top_donors limit:3 %}
      <div class="donor-card donor-card--top">
        <div class="donor-rank">
          {% if forloop.index == 1 %}
          <i class="fas fa-crown"></i>
          {% elsif forloop.index == 2 %}
          <i class="fas fa-medal" style="color: #94a3b8;"></i>
          {% else %}
          <i class="fas fa-medal" style="color: #cd7f32;"></i>
          {% endif %}
        </div>
        <div class="donor-avatar">
          {% if donor.name %}
          <span class="donor-initial">{{ donor.name | slice: 0 | upcase }}</span>
          {% else %}
          <span class="donor-initial donor-initial--anon"><i class="fas fa-user-secret"></i></span>
          {% endif %}
        </div>
        <h3 class="donor-name">{% if donor.name %}{{ donor.name }}{% else %}Anonim{% endif %}</h3>
        <p class="donor-amount">Rp {{ donor.amount | divided_by: 1000 | append: "K" }}</p>
        {% if donor.message and donor.message != "" %}
        <p class="donor-message">"{{ donor.message }}"</p>
        {% endif %}
      </div>
      {% endfor %}
    </div>
    {% endif %}

    <!-- Latest Donors -->
    {% assign latest = site.data.donors | sort: "date" | reverse %}
    {% if latest.size > 0 %}
    <div class="section-header" style="margin-top: 3.5rem;">
      <h2><i class="fas fa-clock" style="color: var(--deepin-blue);"></i> Donasi Terbaru</h2>
    </div>
    <div class="donor-list">
      {% for donor in latest limit:10 %}
      <div class="donor-list-item">
        <span class="donor-list-avatar">
          {% if donor.name %}{{ donor.name | slice: 0 | upcase }}{% else %}<i class="fas fa-user-secret"></i>{% endif %}
        </span>
        <span class="donor-list-name">{% if donor.name %}{{ donor.name }}{% else %}Anonim{% endif %}</span>
        <span class="donor-list-amount">Rp {{ donor.amount | divided_by: 1000 | append: "K" }}</span>
        <span class="donor-list-date">{{ donor.date | date: "%d %b %Y" }}</span>
      </div>
      {% endfor %}
    </div>
    {% endif %}
  </div>
</section>
{% endif %}


