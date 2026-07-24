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
  </div>
</section>

<!-- Donasi Card -->
<section class="headline" style="padding-top: 2rem;">
  <div class="container">
    <div class="headline-card" style="flex-direction: column; text-align: center;">
      <span class="headline-badge">
        <i class="fas fa-heart"></i> DONASI
      </span>
      <div class="headline-body">
        <h2>Dukung Komunitas deepin Indonesia</h2>
        <p>
          Komunitas deepin Indonesia dijalankan sepenuhnya oleh <strong>relawan</strong>. 
          Donasi Anda membantu kami menjaga server, mengadakan event, membuat konten edukasi, 
          dan mengembangkan ekosistem deepin di Indonesia.
        </p>
        <a href="https://app.midtrans.com/payment-links/Donasi-deepin-Indonesia-qSHW6Bup" target="_blank" rel="noopener" class="btn btn-primary" style="font-size: 1.1rem; padding: .85rem 2.5rem;">
          <i class="fas fa-hand-holding-heart"></i> Donasi Sekarang
        </a>
        <p style="margin-top: 1rem; font-size: .82rem; color: var(--color-gray-400);">
          Nama, email, dan nomor HP bersifat opsional. Jika diisi, identitas donatur akan ditampilkan secara publik bersama donasi. Jika tidak diisi, donasi akan dianggap anonim.
        </p>
      </div>
    </div>
  </div>
</section>

<!-- Top Donors -->
{% if site.data.donors %}
<section class="intro-deepin" style="padding-top: 0;">
  <div class="container">
    {% assign top_donors = site.data.donors | sort: "amount" | reverse %}
    
    {% if top_donors.size > 0 %}
    <div class="section-header">
      <h2>Top Donatur</h2>
      <p class="section-subtitle">Terima kasih kepada para donatur yang telah mendukung deepin Indonesia.</p>
    </div>
    <div class="donor-grid">
      {% for donor in top_donors limit:3 %}
      <div class="donor-card donor-card--top">
        <div class="donor-rank">{% if forloop.index == 1 %}<i class="fas fa-crown"></i>{% else %}#{{ forloop.index }}{% endif %}</div>
        <div class="donor-avatar">
          {% if donor.name %}
          <span class="donor-initial">{{ donor.name | slice: 0 | upcase }}</span>
          {% else %}
          <span class="donor-initial donor-initial--anon">?</span>
          {% endif %}
        </div>
        <h3 class="donor-name">{% if donor.name %}{{ donor.name }}{% else %}Anonim{% endif %}</h3>
        <p class="donor-amount">Rp {{ donor.amount | divided_by: 1000 }}K</p>
        {% if donor.message %}
        <p class="donor-message">"{{ donor.message }}"</p>
        {% endif %}
      </div>
      {% endfor %}
    </div>
    {% endif %}

    <!-- Latest Donors -->
    {% assign latest = site.data.donors | sort: "date" | reverse %}
    {% if latest.size > 0 %}
    <div class="section-header" style="margin-top: 3rem;">
      <h2>Donasi Terbaru</h2>
    </div>
    <div class="donor-list">
      {% for donor in latest limit:10 %}
      <div class="donor-list-item">
        <span class="donor-list-avatar">
          {% if donor.name %}
          {{ donor.name | slice: 0 | upcase }}
          {% else %}
          ?
          {% endif %}
        </span>
        <span class="donor-list-name">{% if donor.name %}{{ donor.name }}{% else %}Anonim{% endif %}</span>
        <span class="donor-list-amount">Rp {{ donor.amount | divided_by: 1000 }}K</span>
        <span class="donor-list-date">{{ donor.date | date: "%d %b %Y" }}</span>
      </div>
      {% endfor %}
    </div>
    {% endif %}
  </div>
</section>
{% endif %}

{% include why-deepin.html %}

