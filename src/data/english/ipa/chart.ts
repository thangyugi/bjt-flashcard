/** Bảng 44 âm tiếng Anh (giọng Anh) — dùng cho sơ đồ tổng quan, kể cả khi bài chưa viết. */

export interface ChartCell {
  symbol: string;
  /** Từ khóa ví dụ */
  key: string;
  /** Bài học chứa âm này */
  lesson: string;
}

export const CHART: { title: string; note: string; rows: ChartCell[][] }[] = [
  {
    title: "Nguyên âm đơn (12)",
    note: "Cặp ngắn – dài: dài có dấu ː, căng hơn và kéo dài hơn.",
    rows: [
      [
        { symbol: "iː", key: "see", lesson: "ipa-02" },
        { symbol: "ɪ", key: "sit", lesson: "ipa-02" },
        { symbol: "e", key: "bed", lesson: "ipa-03" },
        { symbol: "æ", key: "cat", lesson: "ipa-03" },
      ],
      [
        { symbol: "ʌ", key: "cup", lesson: "ipa-04" },
        { symbol: "ɑː", key: "car", lesson: "ipa-04" },
        { symbol: "ɒ", key: "hot", lesson: "ipa-05" },
        { symbol: "ɔː", key: "door", lesson: "ipa-05" },
      ],
      [
        { symbol: "ʊ", key: "book", lesson: "ipa-06" },
        { symbol: "uː", key: "food", lesson: "ipa-06" },
        { symbol: "ə", key: "about", lesson: "ipa-07" },
        { symbol: "ɜː", key: "bird", lesson: "ipa-07" },
      ],
    ],
  },
  {
    title: "Nguyên âm đôi (8)",
    note: "Trượt từ âm đầu sang âm sau trong một nhịp — âm đầu rõ, âm sau nhẹ.",
    rows: [
      [
        { symbol: "eɪ", key: "day", lesson: "ipa-08" },
        { symbol: "aɪ", key: "my", lesson: "ipa-08" },
        { symbol: "ɔɪ", key: "boy", lesson: "ipa-08" },
        { symbol: "əʊ", key: "go", lesson: "ipa-09" },
      ],
      [
        { symbol: "aʊ", key: "now", lesson: "ipa-09" },
        { symbol: "ɪə", key: "near", lesson: "ipa-10" },
        { symbol: "eə", key: "hair", lesson: "ipa-10" },
        { symbol: "ʊə", key: "tour", lesson: "ipa-10" },
      ],
    ],
  },
  {
    title: "Phụ âm (24)",
    note: "Từng cặp: trái vô thanh (chỉ có hơi) — phải hữu thanh (dây thanh rung).",
    rows: [
      [
        { symbol: "p", key: "pen", lesson: "ipa-11" },
        { symbol: "b", key: "bad", lesson: "ipa-11" },
        { symbol: "t", key: "tea", lesson: "ipa-11" },
        { symbol: "d", key: "dog", lesson: "ipa-11" },
      ],
      [
        { symbol: "k", key: "cat", lesson: "ipa-12" },
        { symbol: "ɡ", key: "get", lesson: "ipa-12" },
        { symbol: "f", key: "fish", lesson: "ipa-13" },
        { symbol: "v", key: "van", lesson: "ipa-13" },
      ],
      [
        { symbol: "θ", key: "think", lesson: "ipa-13" },
        { symbol: "ð", key: "this", lesson: "ipa-13" },
        { symbol: "s", key: "sun", lesson: "ipa-14" },
        { symbol: "z", key: "zoo", lesson: "ipa-14" },
      ],
      [
        { symbol: "ʃ", key: "she", lesson: "ipa-14" },
        { symbol: "ʒ", key: "vision", lesson: "ipa-14" },
        { symbol: "tʃ", key: "chair", lesson: "ipa-15" },
        { symbol: "dʒ", key: "job", lesson: "ipa-15" },
      ],
      [
        { symbol: "h", key: "hat", lesson: "ipa-15" },
        { symbol: "m", key: "man", lesson: "ipa-16" },
        { symbol: "n", key: "no", lesson: "ipa-16" },
        { symbol: "ŋ", key: "sing", lesson: "ipa-16" },
      ],
      [
        { symbol: "l", key: "leg", lesson: "ipa-17" },
        { symbol: "r", key: "red", lesson: "ipa-17" },
        { symbol: "w", key: "wet", lesson: "ipa-17" },
        { symbol: "j", key: "yes", lesson: "ipa-17" },
      ],
    ],
  },
];

/** Thứ tự & tên các bài (để hiện mục lục kể cả bài chưa có nội dung) */
export const IPA_OUTLINE: { id: string; title: string; mark: string; group: string }[] = [
  { id: "ipa-01", title: "Nhập môn IPA", mark: "IPA", group: "Nhập môn" },
  { id: "ipa-02", title: "i dài & i ngắn", mark: "iː · ɪ", group: "Nguyên âm đơn" },
  { id: "ipa-03", title: "e & æ", mark: "e · æ", group: "Nguyên âm đơn" },
  { id: "ipa-04", title: "ʌ & ɑː", mark: "ʌ · ɑː", group: "Nguyên âm đơn" },
  { id: "ipa-05", title: "ɒ & ɔː", mark: "ɒ · ɔː", group: "Nguyên âm đơn" },
  { id: "ipa-06", title: "ʊ & uː", mark: "ʊ · uː", group: "Nguyên âm đơn" },
  { id: "ipa-07", title: "ə (schwa) & ɜː", mark: "ə · ɜː", group: "Nguyên âm đơn" },
  { id: "ipa-08", title: "eɪ · aɪ · ɔɪ", mark: "eɪ · aɪ · ɔɪ", group: "Nguyên âm đôi" },
  { id: "ipa-09", title: "əʊ · aʊ", mark: "əʊ · aʊ", group: "Nguyên âm đôi" },
  { id: "ipa-10", title: "ɪə · eə · ʊə", mark: "ɪə · eə · ʊə", group: "Nguyên âm đôi" },
  { id: "ipa-11", title: "p · b · t · d", mark: "p b t d", group: "Phụ âm" },
  { id: "ipa-12", title: "k · ɡ", mark: "k ɡ", group: "Phụ âm" },
  { id: "ipa-13", title: "f · v · θ · ð", mark: "f v θ ð", group: "Phụ âm" },
  { id: "ipa-14", title: "s · z · ʃ · ʒ", mark: "s z ʃ ʒ", group: "Phụ âm" },
  { id: "ipa-15", title: "tʃ · dʒ · h", mark: "tʃ dʒ h", group: "Phụ âm" },
  { id: "ipa-16", title: "m · n · ŋ", mark: "m n ŋ", group: "Phụ âm" },
  { id: "ipa-17", title: "l · r · w · j", mark: "l r w j", group: "Phụ âm" },
  { id: "ipa-18", title: "Âm cuối & cụm phụ âm", mark: "-s · -ed", group: "Nâng cao" },
  { id: "ipa-19", title: "Trọng âm từ & câu", mark: "ˈ", group: "Nâng cao" },
  { id: "ipa-20", title: "Nối âm, nuốt âm & ngữ điệu", mark: "‿", group: "Nâng cao" },
];
