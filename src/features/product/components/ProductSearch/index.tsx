'use client';

import { useRef, useState, type ChangeEvent, type FormEvent } from 'react';

import { useDebouncedCallback } from '@/shared/hooks/useDebouncedCallback';
import { CloseIcon, SearchIcon } from '@/shared/ui/Icon';

import { SEARCH_DEBOUNCE_MS } from '../../model/constants';

import styles from './ProductSearch.module.scss';

type ProductSearchProps = {
  keyword: string; // URL에 반영된 검색어
  onKeywordChange: (keyword: string) => void;
};

export function ProductSearch({ keyword, onKeywordChange }: ProductSearchProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  // 입력 중인 값. URL(keyword)은 디바운스 후에만 바뀌므로 화면 입력값은 따로 들고 있는다.
  const [value, setValue] = useState(keyword);
  const [syncedKeyword, setSyncedKeyword] = useState(keyword);
  const { debounced: applyKeywordLater, cancel } = useDebouncedCallback(
    onKeywordChange,
    SEARCH_DEBOUNCE_MS,
  );

  // 뒤로 가기처럼 URL이 바깥에서 바뀌면 입력값을 맞춘다.
  // 내가 보낸 검색어가 돌아온 경우(앞뒤 공백만 다름)에는 입력 중인 값을 건드리지 않는다.
  if (keyword !== syncedKeyword) {
    setSyncedKeyword(keyword);
    if (keyword !== value.trim()) {
      setValue(keyword);
    }
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
    applyKeywordLater(event.target.value.trim());
  }

  // Enter는 기다리지 않고 바로 검색한다.
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    cancel();
    onKeywordChange(value.trim());
  }

  function handleClear() {
    cancel();
    setValue('');
    onKeywordChange('');
    inputRef.current?.focus();
  }

  return (
    <form role="search" className={styles.search} onSubmit={handleSubmit}>
      <SearchIcon className={styles.searchIcon} />
      <input
        ref={inputRef}
        type="search"
        className={styles.input}
        value={value}
        onChange={handleChange}
        placeholder="검색"
        aria-label="교재 검색"
        enterKeyHint="search"
      />
      {value ? (
        <button
          type="button"
          className={styles.clearButton}
          onClick={handleClear}
          aria-label="검색어 지우기"
        >
          <CloseIcon />
        </button>
      ) : null}
    </form>
  );
}
