# Jekyll plugin: format angka Rupiah dengan separator ribuan (.)
# Contoh: 1500000 → 1.500.000, 100000 → 100.000

module Jekyll
  module RupiahFilter
    def format_rupiah(amount)
      amount.to_i.to_s.reverse.gsub(/(\d{3})(?=\d)/, '\\1.').reverse
    end
  end
end

Liquid::Template.register_filter(Jekyll::RupiahFilter)
