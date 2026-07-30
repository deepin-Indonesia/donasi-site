# Jekyll plugin: format angka Rupiah dengan separator ribuan (.)
# Contoh: 1500000 → 1.500K, 100000 → 100K

module Jekyll
  module RupiahFilter
    def format_rupiah(amount)
      amount = amount.to_i
      if amount >= 1_000_000
        # Format dengan separator ribuan: 1.500K, 12.750K
        k = amount / 1000
        k.to_s.reverse.gsub(/(\d{3})(?=\d)/, '\\1.').reverse + "K"
      elsif amount >= 1000
        # 1K - 999K: tanpa separator
        "#{amount / 1000}K"
      else
        # < 1000: tampilkan apa adanya
        amount.to_s
      end
    end
  end
end

Liquid::Template.register_filter(Jekyll::RupiahFilter)
