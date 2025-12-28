
import React, { useState } from 'react';
import { User, AppTheme } from '../types';
import { updateUserProfile, deleteUserAccount } from '../services/authService';

interface ProfilePanelProps {
  user: User;
  onUpdate: (user: User) => void;
  onDelete: () => void;
  onClose: () => void;
}

const ProfilePanel: React.FC<ProfilePanelProps> = ({ user, onUpdate, onDelete, onClose }) => {
  const [displayName, setDisplayName] = useState(user.displayName || '');
  const [bio, setBio] = useState(user.bio || '');
  const [isSaving, setIsSaving] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    const updated = await updateUserProfile(user.username, { displayName, bio });
    onUpdate(updated);
    setIsSaving(false);
  };

  const changeTheme = async (theme: AppTheme) => {
    const updated = await updateUserProfile(user.username, { theme });
    onUpdate(updated);
  };

  const toggleVip = async () => {
    const updated = await updateUserProfile(user.username, { isVip: !user.isVip });
    onUpdate(updated);
  };

  const handleDelete = async () => {
    await deleteUserAccount(user.username);
    onDelete();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-2xl bg-[var(--theme-bg-dark)] baroque-border-outer p-8 md:p-16 rounded-[4rem] gold-glow-heavy relative overflow-hidden max-h-[90vh] overflow-y-auto">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/black-paper.png')] pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col gap-10">
          <div className="flex justify-between items-center border-b border-[var(--theme-primary)]/20 pb-6">
            <h2 className="text-4xl font-cinzel text-[var(--theme-primary)] font-black tracking-widest">聖殿金銀帳本</h2>
            <button onClick={onClose} className="text-[var(--theme-primary)]/40 hover:text-[var(--theme-primary)] text-3xl font-cinzel">×</button>
          </div>

          {/* 風格切換 */}
          <div className="space-y-4">
            <label className="text-[10px] font-cinzel text-[var(--theme-primary)]/40 tracking-[0.3em] uppercase">聖殿氛圍 (Sanctuary Atmosphere)</label>
            <div className="grid grid-cols-3 gap-4">
              {[
                { id: AppTheme.BAROQUE, label: '巴洛克', color: '#d4af37' },
                { id: AppTheme.CYBERPUNK, label: '賽博', color: '#00f3ff' },
                { id: AppTheme.CELESTIAL, label: '星辰', color: '#ffffff' }
              ].map(t => (
                <button
                  key={t.id}
                  onClick={() => changeTheme(t.id)}
                  className={`py-3 rounded-xl border-2 font-cinzel text-xs font-black transition-all ${user.theme === t.id ? 'border-[var(--theme-primary)] bg-[var(--theme-primary)]/10' : 'border-white/5 bg-black/40 hover:border-white/20'}`}
                  style={{ color: t.color }}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
             <div className="bg-black/40 p-4 rounded-2xl border border-[var(--theme-primary)]/10 text-center">
              <p className="text-[10px] font-cinzel text-[var(--theme-primary)]/40 mb-1">修行次數</p>
              <p className="text-2xl font-cinzel text-[var(--theme-primary)] font-bold">{user.readingsCount}</p>
            </div>
            <div className="bg-black/40 p-4 rounded-2xl border border-[var(--theme-primary)]/10 text-center">
              <p className="text-[10px] font-cinzel text-[var(--theme-primary)]/40 mb-1">奉獻金幣</p>
              <p className="text-2xl font-cinzel text-[var(--theme-primary)] font-bold">${user.spending}</p>
            </div>
            <div className="bg-black/40 p-4 rounded-2xl border border-[var(--theme-primary)]/10 text-center">
              <p className="text-[10px] font-cinzel text-[var(--theme-primary)]/40 mb-1">契約日期</p>
              <p className="text-sm font-cinzel text-[var(--theme-primary)] font-bold">{new Date(user.joinedDate).toLocaleDateString()}</p>
            </div>
            <div className={`p-4 rounded-2xl border text-center transition-all ${user.isVip ? 'bg-[var(--theme-primary)]/20 border-[var(--theme-primary)]' : 'bg-black/40 border-[var(--theme-primary)]/10'}`}>
              <p className="text-[10px] font-cinzel text-[var(--theme-primary)]/40 mb-1">靈魂位階</p>
              <p className="text-sm font-cinzel text-[var(--theme-primary)] font-bold uppercase tracking-widest">{user.isVip ? '★ VIP ★' : '求道者'}</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-cinzel text-[var(--theme-primary)] tracking-[0.2em]">聖殿尊號</label>
              <input 
                type="text" 
                value={displayName} 
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full bg-black/40 border border-[var(--theme-primary)]/30 rounded-full px-6 py-4 text-[var(--theme-primary)] focus:border-[var(--theme-primary)] outline-none font-lora italic"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-cinzel text-[var(--theme-primary)] tracking-[0.2em]">修行筆記</label>
              <textarea 
                value={bio} 
                onChange={(e) => setBio(e.target.value)}
                className="w-full bg-black/40 border border-[var(--theme-primary)]/30 rounded-3xl px-6 py-4 text-[var(--theme-primary)] focus:border-[var(--theme-primary)] outline-none font-lora italic h-32"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-4 pt-6">
            <button 
              onClick={handleSave} 
              disabled={isSaving}
              className="flex-1 py-4 bg-[var(--theme-primary)] text-black font-cinzel font-black tracking-widest rounded-full hover:brightness-110 active:scale-95 transition-all disabled:opacity-50"
            >
              {isSaving ? '正在編寫...' : '存檔印記'}
            </button>
            <button 
              onClick={toggleVip} 
              className={`flex-1 py-4 border font-cinzel font-black tracking-widest rounded-full transition-all ${user.isVip ? 'border-[var(--theme-primary)]/40 text-[var(--theme-primary)]/40' : 'border-purple-500 text-purple-500'}`}
            >
              {user.isVip ? '暫停 VIP' : '升華 VIP'}
            </button>
          </div>

          <div className="mt-12 pt-12 border-t border-red-900/30 text-center">
            {!showDeleteConfirm ? (
              <button onClick={() => setShowDeleteConfirm(true)} className="text-red-900/50 hover:text-red-600 text-[10px] font-cinzel tracking-widest uppercase">† 解除聖殿契約 †</button>
            ) : (
              <div className="flex flex-col items-center gap-4 animate-bounce">
                <p className="text-red-500 font-lora italic text-xs">確定解除契約？</p>
                <div className="flex gap-4">
                  <button onClick={handleDelete} className="px-6 py-2 bg-red-900 text-white font-cinzel text-xs rounded-full">確信解除</button>
                  <button onClick={() => setShowDeleteConfirm(false)} className="px-6 py-2 bg-white/10 text-white font-cinzel text-xs rounded-full">返回</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePanel;
