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
          <p><i class="fas fa-info-circle"></i> Nama, <strong>email</strong>, dan nomor HP bersifat <strong>opsional</strong>. Jika diisi, identitas Anda akan ditampilkan (email disensor). Jika dikosongkan, donasi dianggap <strong>anonim</strong>. Total donasi publik dihitung per email — donasi dari email yang sama akan digabung.</p>
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
    {% assign all_total = 0 %}
    {% assign all_count = 0 %}
    {% for d in site.data.donors %}
      {% assign all_total = all_total | plus: d.amount %}
      {% assign all_count = all_count | plus: 1 %}
      {% if d.name == "" or d.name == nil %}
        {% assign anon_total = anon_total | plus: d.amount %}
        {% assign anon_count = anon_count | plus: 1 %}
      {% endif %}
    {% endfor %}

    <div class="section-header">
      <h2><i class="fas fa-trophy" style="color: #f59e0b;"></i> Apresiasi Donatur</h2>
      <p class="section-subtitle">
        Total <strong>{{ all_count }}</strong> donasi terkumpul senilai <strong>Rp {{ all_total | divided_by: 1000 | append: "K" }}</strong>.
        Perhitungan donasi publik digabung berdasarkan <strong>email yang sama</strong> — jika satu email donasi beberapa kali, jumlahnya akan ditotal.
      </p>
      <p class="donor-updated-note">
        <i class="fas fa-sync-alt"></i> Data per 24 July 2026, 01:44 WIB · <em>Update via file CSV</em>
      </p>
    </div>

    {% comment %}--- Row Anonim full-width ---{% endcomment %}
    {% if anon_count > 0 %}
    <div class="donor-anon-banner">
      <div class="donor-anon-banner__icon">
        <i class="fas fa-user-secret"></i>
      </div>
      <div class="donor-anon-banner__info">
        <h3>Donatur Anonim</h3>
        <p>{{ anon_count }} donasi &middot; total <strong>Rp {{ anon_total | divided_by: 1000 | append: "K" }}</strong></p>
      </div>
    </div>
    {% endif %}

    <div class="donor-grid">
      {% comment %}--- Group by email & hitung total ---{% endcomment %}
      {% assign public_donors = "" | split: "" %}
      {% for d in site.data.donors %}
        {% if d.name != "" and d.name != nil %}
          {% assign public_donors = public_donors | push: d %}
        {% endif %}
      {% endfor %}

      {% assign grouped = public_donors | group_by: "email" %}
      {% assign top_groups = "" | split: "" %}
      {% for g in grouped %}
        {% if g.name != "" and g.name != nil %}
          {% assign gtotal = 0 %}
          {% assign gcount = 0 %}
          {% for item in g.items %}
            {% assign gtotal = gtotal | plus: item.amount %}
            {% assign gcount = gcount | plus: 1 %}
          {% endfor %}
          {% assign first = g.items | first %}
          {% assign gtotal_str = gtotal | prepend: "000000" | slice: -6, 6 %}
          {% capture entry %}{{ gtotal_str }}|{{ first.name }}|{{ first.email }}|{{ gtotal }}|{{ gcount }}{% endcapture %}
          {% assign top_groups = top_groups | push: entry %}
        {% endif %}
      {% endfor %}
      {% assign sorted_top = top_groups | sort | reverse %}

      {% for entry in sorted_top limit:3 %}
      {% assign parts = entry | split: "|" %}
      {% assign gname = parts[1] %}
      {% assign gemail = parts[2] %}
      {% assign gtotal = parts[3] | plus: 0 %}
      {% assign gcount = parts[4] | plus: 0 %}
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
        {% assign email_parts = gemail | split: "@" %}
        <p class="donor-email-sensor">{{ email_parts[0] | truncate: 5, "" }}@***</p>
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
          {% if donor.name != "" and donor.name != nil %}{{ donor.name | slice: 0 | upcase }}{% else %}<i class="fas fa-user-secret"></i>{% endif %}
        </span>
        <span class="donor-list-name">{% if donor.name != "" and donor.name != nil %}{{ donor.name }}{% else %}Anonim{% endif %}</span>
        <span class="donor-list-amount">Rp {{ donor.amount | divided_by: 1000 | append: "K" }}</span>
        <span class="donor-list-date">{{ donor.date | date: "%d %b %Y" }}</span>
      </div>
      {% endfor %}
    </div>

  </div>
</section>
{% endif %}


