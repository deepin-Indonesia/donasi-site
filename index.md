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

<!-- Donors Section -->
{% if site.data.donors %}
<section class="donasi-donors">
  <div class="container">

    {% comment %}--- Hitung donatur anonim ---{% endcomment %}
    {% assign anon_total = 0 %}
    {% assign anon_count = 0 %}
    {% for d in site.data.donors %}
      {% if d.name == "" or d.name == nil %}
        {% assign anon_total = anon_total | plus: d.amount %}
        {% assign anon_count = anon_count | plus: 1 %}
      {% endif %}
    {% endfor %}

    {% comment %}--- Donasi publik digrup by email ---{% endcomment %}
    {% assign public_donors = "" | split: "" %}
    {% for d in site.data.donors %}
      {% if d.name != "" and d.name != nil %}
        {% assign public_donors = public_donors | push: d %}
      {% endif %}
    {% endfor %}
    {% assign grouped = public_donors | group_by: "email" %}

    {% comment %}--- Hitung total per email ---{% endcomment %}
    {% assign donor_groups = "" | split: "" %}
    {% for group in grouped %}
      {% if group.name != "" and group.name != nil %}
        {% assign total = 0 %}
        {% assign count = 0 %}
        {% assign last_donation = group.items | first %}
        {% for item in group.items %}
          {% assign total = total | plus: item.amount %}
          {% assign count = count | plus: 1 %}
        {% endfor %}
        {% assign entry = "" | split: "" %}
        {% assign entry = entry | push: last_donation.name %}
        {% assign entry = entry | push: last_donation.email %}
        {% assign entry = entry | push: total %}
        {% assign entry = entry | push: count %}
        {% assign donor_groups = donor_groups | push: entry %}
      {% endif %}
    {% endfor %}

    {% comment %}--- Urutkan by total ---{% endcomment %}
    {% assign sorted_groups = donor_groups | sort: "2" | reverse %}

    <div class="section-header">
      <h2><i class="fas fa-trophy" style="color: #f59e0b;"></i> Top Donatur</h2>
      <p class="section-subtitle">Terima kasih kepada para donatur yang telah mendukung kami. Donasi publik digabung berdasarkan email yang sama.</p>
    </div>

    <div class="donor-grid">
      {% comment %}--- Card Donatur Anonim ---{% endcomment %}
      {% if anon_count > 0 %}
      <div class="donor-card donor-card--top donor-card--anon">
        <div class="donor-rank">
          <i class="fas fa-user-secret"></i>
        </div>
        <div class="donor-avatar">
          <span class="donor-initial donor-initial--anon"><i class="fas fa-users"></i></span>
        </div>
        <h3 class="donor-name">Donatur Anonim</h3>
        <p class="donor-amount">Rp {{ anon_total | divided_by: 1000 | append: "K" }}</p>
        <p class="donor-meta">{{ anon_count }} donasi anonim</p>
      </div>
      {% endif %}

      {% comment %}--- Top 3 public donors (grouped) ---{% endcomment %}
      {% for group in sorted_groups limit:3 %}
      {% assign gname = group[0] %}
      {% assign gemail = group[1] %}
      {% assign gtotal = group[2] %}
      {% assign gcount = group[3] %}
      {% assign censor = gemail | split: "@" | first | append: "@***" %}
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
          <span class="donor-initial">{{ gname | slice: 0 | upcase }}</span>
        </div>
        <h3 class="donor-name">{{ gname }}</h3>
        <p class="donor-email-sensor">{{ censor }}</p>
        <p class="donor-amount">Rp {{ gtotal | divided_by: 1000 | append: "K" }}</p>
        {% if gcount > 1 %}
        <p class="donor-meta">{{ gcount }}x donasi</p>
        {% endif %}
      </div>
      {% endfor %}
    </div>

    <!-- Latest Donors -->
    {% assign latest = site.data.donors | sort: "date" | reverse %}
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

  </div>
</section>
{% endif %}


