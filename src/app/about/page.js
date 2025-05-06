'use client';
import { useEffect, useRef } from 'react';
import 'tui-grid/dist/tui-grid.css';

export default function Home() {
  const gridRef = useRef(null);

  useEffect(() => {
    async function loadGrid() {
      const Grid = (await import('tui-grid')).default;

      const response = await fetch('/mock/korea-counties.json');
      const data = await response.json();

      if (!gridRef.current) return;

      new Grid({
        el: gridRef.current,
        data: data,
        scrollX: false,
        scrollY: true,
        bodyHeight: 500,
        rowHeight: 35,
        columns: [
          { header: '시도명', name: 'sido', width: 100 },
          { header: '군구명', name: 'gungu', width: 200 },
          { header: '지역코드', name: 'code', width: 120 }
        ]
      });
    }

    loadGrid();
  }, []);

  return (
    <main style={{ padding: '2rem' }}>
      <h1>전국 군구 정보</h1>
      <div ref={gridRef} />
    </main>
  );
}
