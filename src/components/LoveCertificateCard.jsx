import React, { useRef, useState } from 'react';
import { Award, Download, Heart, Sparkles, Check, Share2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function LoveCertificateCard() {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleDownloadCertificate = () => {
    setIsDownloading(true);

    try {
      // Create high-resolution canvas (1200 x 850)
      const canvas = document.createElement('canvas');
      canvas.width = 1200;
      canvas.height = 850;
      const ctx = canvas.getContext('2d');

      // 1. Background Cream / Soft Rose
      const bgGrad = ctx.createLinearGradient(0, 0, 1200, 850);
      bgGrad.addColorStop(0, '#fffcf8');
      bgGrad.addColorStop(0.5, '#fff7f9');
      bgGrad.addColorStop(1, '#fff5f7');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, 1200, 850);

      // 2. Ornate Golden Outer & Inner Borders
      ctx.strokeStyle = '#d97706'; // Gold/Amber
      ctx.lineWidth = 6;
      ctx.strokeRect(30, 30, 1140, 790);

      ctx.strokeStyle = '#f43f5e'; // Rose
      ctx.lineWidth = 1.5;
      ctx.strokeRect(42, 42, 1116, 766);

      ctx.strokeStyle = '#fde68a'; // Light gold
      ctx.lineWidth = 1;
      ctx.strokeRect(48, 48, 1104, 754);

      // 3. Corner Ornaments
      const drawCorner = (x, y) => {
        ctx.save();
        ctx.translate(x, y);
        ctx.fillStyle = '#f59e0b';
        ctx.beginPath();
        ctx.arc(0, 0, 10, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      };
      drawCorner(42, 42);
      drawCorner(1158, 42);
      drawCorner(42, 808);
      drawCorner(1158, 808);

      // 4. Header Titles
      ctx.textAlign = 'center';

      // Ribbon / Subtitle
      ctx.fillStyle = '#e11d48';
      ctx.font = 'bold 18px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('PENGHARGAAN RESMI 4 TAHUN CINTA SEJATI', 600, 120);

      // Main Title
      ctx.fillStyle = '#1c1917';
      ctx.font = 'bold 44px "Playfair Display", Georgia, serif';
      ctx.fillText('SERTIFIKAT CINTA ABADI', 600, 175);

      ctx.fillStyle = '#78716c';
      ctx.font = 'italic 18px "Playfair Display", serif';
      ctx.fillText('Certificate of Everlasting Love & Partnership', 600, 210);

      // Divider line with heart
      ctx.strokeStyle = '#fca5a5';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(350, 235);
      ctx.lineTo(570, 235);
      ctx.moveTo(630, 235);
      ctx.lineTo(850, 235);
      ctx.stroke();

      ctx.fillStyle = '#e11d48';
      ctx.font = '24px sans-serif';
      ctx.fillText('❤️', 600, 243);

      // Recipient Pre-text
      ctx.fillStyle = '#57534e';
      ctx.font = '18px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('Dengan segenap rasa sayang dan ketulusan hati, dianugerahkan kepada:', 600, 285);

      // Recipient Name
      ctx.fillStyle = '#e11d48';
      ctx.font = 'bold 64px "Playfair Display", Georgia, serif';
      ctx.fillText('Nada', 600, 360);

      // Description / Dedication
      ctx.fillStyle = '#44403c';
      ctx.font = '20px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('Sebagai pasangan terhebat, paling pengertian, dan paling dicintai,', 600, 425);
      ctx.fillText('yang telah menemani dan mewarnai hidup Aldy dengan tawa, kebahagiaan,', 600, 460);
      ctx.fillText('serta kesetiaan tanpa batas selama 4 Tahun (1.461 Hari) perjalanan kita.', 600, 495);

      // Quote
      ctx.fillStyle = '#e11d48';
      ctx.font = 'italic 21px "Caveat", cursive, Georgia, serif';
      ctx.fillText('"Terima kasih sudah memilih untuk terus melangkah bersama Aldy. Selamanya mencintaimu."', 600, 560);

      // 5. Wax Seal in Center Bottom
      ctx.save();
      ctx.translate(600, 675);
      // Outer wax ring
      ctx.fillStyle = '#be123c';
      ctx.beginPath();
      ctx.arc(0, 0, 48, 0, Math.PI * 2);
      ctx.fill();

      // Inner golden ring
      ctx.strokeStyle = '#fef08a';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.arc(0, 0, 40, 0, Math.PI * 2);
      ctx.stroke();

      // Seal text
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 13px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('4 TAHUN', 0, -8);
      ctx.font = 'bold 10px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('2022 - 2026', 0, 10);
      ctx.font = '16px sans-serif';
      ctx.fillText('💍', 0, 28);
      ctx.restore();

      // 6. Signatures (Left: Aldy, Right: Nada)
      // Left: Aldy
      ctx.textAlign = 'center';
      ctx.fillStyle = '#1e293b';
      ctx.font = 'italic bold 32px "Caveat", cursive, Georgia, serif';
      ctx.fillText('Aldy', 300, 670);

      ctx.strokeStyle = '#78716c';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(200, 685);
      ctx.lineTo(400, 685);
      ctx.stroke();

      ctx.fillStyle = '#78716c';
      ctx.font = 'bold 14px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('Tertanda dengan Cinta, Aldy', 300, 710);
      ctx.font = '12px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('22 November 2026', 300, 730);

      // Right: Nada
      ctx.fillStyle = '#1e293b';
      ctx.font = 'italic bold 32px "Caveat", cursive, Georgia, serif';
      ctx.fillText('Nada', 900, 670);

      ctx.strokeStyle = '#78716c';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(800, 685);
      ctx.lineTo(1000, 685);
      ctx.stroke();

      ctx.fillStyle = '#78716c';
      ctx.font = 'bold 14px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('Kekasih Tercinta, Nada', 900, 710);
      ctx.font = '12px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('22 November 2026', 900, 730);

      // Convert to PNG and Trigger Download
      const dataUrl = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.href = dataUrl;
      downloadLink.download = 'Sertifikat_Cinta_Aldy_Nada_4_Tahun.png';
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);

      // Success feedback
      setIsDownloading(false);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 4000);

      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f59e0b', '#f43f5e', '#fb7185', '#fbbf24'],
      });
    } catch (err) {
      console.error('Export error:', err);
      setIsDownloading(false);
    }
  };

  return (
    <section id="sertifikat" className="py-14 sm:py-20 px-3.5 sm:px-4 max-w-4xl mx-auto section-opt">
      {/* Header */}
      <div className="text-center mb-8 sm:mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-semibold uppercase tracking-wider mb-2.5 sm:mb-3 whitespace-nowrap">
          <Award className="w-3.5 h-3.5 shrink-0 text-amber-600" /> Sertifikat Cinta Resmi 4 Tahun
        </div>
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-romantic font-bold text-gray-900 mb-2 sm:mb-4 leading-tight">
          Penghargaan Cinta <span className="inline-block whitespace-nowrap text-rose-600">Untuk Nada</span>
        </h2>
        <p className="text-gray-600 max-w-lg mx-auto text-xs sm:text-base px-2">
          Sebagai lambang cinta abadi dan apresiasi setinggi-tingginya atas 4 tahun kebersamaan kita. Kamu bisa mengunduh sertifikat ini langsung ke galerimu!
        </p>
      </div>

      {/* Certificate UI Preview Card */}
      <div className="relative bg-gradient-to-br from-amber-50/50 via-white to-rose-50/50 rounded-3xl p-5 sm:p-10 border-4 border-double border-amber-400/80 shadow-xl shadow-rose-900/10 text-center select-none overflow-hidden">
        {/* Subtle Watermark in Center */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
          <Heart className="w-96 h-96 text-rose-600" />
        </div>

        {/* Certificate Inner Frame */}
        <div className="border border-rose-200/80 rounded-2xl p-4 sm:p-8 relative z-10">
          {/* Header Seal & Title */}
          <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-400 text-white shadow-md shadow-amber-500/30 mb-3 sm:mb-4">
            <Award className="w-7 h-7 sm:w-9 sm:h-9" />
          </div>

          <span className="block text-[10px] sm:text-xs font-bold tracking-widest text-rose-600 uppercase mb-1">
            PENGHARGAAN RESMI 4 TAHUN CINTA SEJATI
          </span>
          <h3 className="text-2xl sm:text-4xl font-romantic font-bold text-gray-900 mb-1">
            SERTIFIKAT CINTA ABADI
          </h3>
          <p className="text-xs sm:text-sm font-romantic italic text-gray-500 mb-4 sm:mb-6">
            Certificate of Everlasting Love & Partnership
          </p>

          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-rose-300 to-transparent mx-auto mb-5 sm:mb-6" />

          {/* Recipient */}
          <p className="text-xs sm:text-sm text-gray-600 mb-2">
            Dengan segenap rasa sayang dan ketulusan hati, dianugerahkan kepada:
          </p>
          <div className="text-3xl sm:text-5xl font-romantic font-bold text-rose-600 mb-4 sm:mb-6 tracking-wide drop-shadow-xs">
            Nada
          </div>

          {/* Statement */}
          <p className="text-xs sm:text-base text-gray-700 max-w-xl mx-auto leading-relaxed mb-4">
            Sebagai pasangan terhebat, paling pengertian, dan paling dicintai, yang telah menemani dan mewarnai hidup Aldy dengan tawa, kebahagiaan, serta kesetiaan tanpa batas selama <strong>4 Tahun (1.461 Hari)</strong> perjalanan kita.
          </p>

          <p className="font-handwriting text-base sm:text-xl text-rose-500 italic mb-8 sm:mb-10">
            "Terima kasih sudah memilih untuk terus melangkah bersama Aldy. Selamanya mencintaimu."
          </p>

          {/* Signatures Row */}
          <div className="grid grid-cols-2 gap-4 sm:gap-8 pt-6 border-t border-rose-100 max-w-lg mx-auto">
            <div>
              <div className="font-handwriting text-xl sm:text-2xl text-gray-800 mb-1 font-bold">
                Aldy
              </div>
              <div className="w-28 sm:w-36 h-px bg-gray-400 mx-auto mb-1" />
              <div className="text-[10px] sm:text-xs font-semibold text-gray-600">Tertanda, Aldy</div>
              <div className="text-[9px] sm:text-[10px] text-gray-400">22 November 2026</div>
            </div>

            <div>
              <div className="font-handwriting text-xl sm:text-2xl text-gray-800 mb-1 font-bold">
                Nada
              </div>
              <div className="w-28 sm:w-36 h-px bg-gray-400 mx-auto mb-1" />
              <div className="text-[10px] sm:text-xs font-semibold text-gray-600">Kekasih Tercinta, Nada</div>
              <div className="text-[9px] sm:text-[10px] text-gray-400">22 November 2026</div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
        <button
          onClick={handleDownloadCertificate}
          disabled={isDownloading}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-bold text-xs sm:text-sm shadow-lg shadow-rose-500/25 transition-all duration-300 active:scale-95 cursor-pointer disabled:opacity-50"
        >
          {downloadSuccess ? (
            <>
              <Check className="w-4 h-4 text-white" />
              <span>Sertifikat Berhasil Diunduh! ✨</span>
            </>
          ) : (
            <>
              <Download className="w-4 h-4" />
              <span>{isDownloading ? 'Menyiapkan Gambar...' : 'Unduh Sertifikat (Gambar PNG HD)'}</span>
            </>
          )}
        </button>
      </div>
    </section>
  );
}
