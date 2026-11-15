"""yt-dlp wrapper to download social media videos"""
import uuid
import subprocess
import tempfile
from pathlib import Path


def download_video(url: str) -> Path:
    """Download a reel/short to /tmp/creatoros_<uuid>.mp4"""
    out = Path(tempfile.gettempdir()) / f"creatoros_{uuid.uuid4().hex}.mp4"
    cmd = [
        "yt-dlp",
        "--no-playlist",
        "--format", "bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best",
        "--merge-output-format", "mp4",
        "--output", str(out),
        "--quiet",
        url,
    ]
    result = subprocess.run(cmd, capture_output=True, text=True, timeout=120)
    if result.returncode != 0:
        raise RuntimeError(f"yt-dlp failed: {result.stderr[:500]}")
    if not out.exists():
        raise FileNotFoundError(f"Download produced no file for {url}")
    return out
