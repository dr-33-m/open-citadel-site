"""Cut the landing-page journey film from the raw clips.

Usage: python3 scripts/cut-journey.py recordings/raw <work_dir> public/videos/journey.mp4
Prints each chapter's start time in the finished film, for src/journey.ts.

The raw clips are variable frame rate (a still screen writes almost no
frames), so each segment is first rendered to its own constant-rate file with
an exact frame count. Crossfading those is then exact.
"""
import subprocess
import sys

RAW, WORK, OUT = sys.argv[1], sys.argv[2], sys.argv[3]
XF = 0.2  # crossfade at every cut, seconds
W, H, FPS = 720, 1600, 30

# (chapter, clip, start, end, speed)
EDL = [
    ("curiosity", "01-curiosity", 0.0, 9.15, 1.0),  # ends as Podcasts is tapped
    ("explore", "02-explore", 0.0, 14.5, 1.0),    # podcasts tab held, then the episode
    ("learn", "03-learn", 2.5, 6.5, 1.0),       # highlight sheet, then Chat
    ("learn", "03-learn", 9.5, 13.5, 1.0),      # typed question, sent
    ("learn", "03-learn", 35.5, 40.3, 1.0),     # Samwell answers
    ("learn", "04-apply", 0.5, 3.0, 1.0),       # the settled reply
    ("apply", "04-apply", 7.5, 13.5, 1.5),      # "Can you make it a goal?"
    ("apply", "04-apply", 109.5, 115.0, 1.0),   # the goal card
    ("apply", "04-apply", 117.0, 123.5, 1.0),   # Start this goal, toolbox
    ("apply", "04-apply", 125.5, 133.0, 1.25),  # Compass, planner
    ("grow", "05-grow", 7.0, 11.0, 1.25),       # five weeks later, the question
    ("grow", "05-grow", 20.5, 22.5, 1.0),       # searched your highlights for TIG
    ("grow", "05-grow", 39.0, 42.5, 1.0),       # the line comes back
    ("grow", "05-grow", 45.5, 48.5, 1.0),       # "A Reminder Not to Give Up"
    ("grow", "05-grow", 55.0, 60.0, 1.0),       # Insights, 3 of 4
]


def run(args):
    subprocess.run(["ffmpeg", "-v", "error", "-y", *args], check=True)


segs, lengths = [], []
for i, (_, clip, a, b, speed) in enumerate(EDL):
    frames = round((b - a) / speed * FPS)
    lengths.append(frames / FPS)
    seg = f"{WORK}/seg{i:02d}.mp4"
    run([
        "-ss", str(a), "-i", f"{RAW}/{clip}.mp4", "-t", str(b - a),
        "-vf", f"setpts=(PTS-STARTPTS)/{speed},fps={FPS},"
               f"tpad=stop_mode=clone:stop_duration=3,"
               f"scale={W}:{H}:flags=lanczos,setsar=1,format=yuv420p",
        "-frames:v", str(frames), "-r", str(FPS),
        "-c:v", "libx264", "-preset", "fast", "-crf", "10", "-an", seg,
    ])
    segs.append(seg)

inputs, chains = [], []
for s in segs:
    inputs += ["-i", s]
prev, total = "0:v", lengths[0]
starts = {EDL[0][0]: 0.0}
for i in range(1, len(segs)):
    off = total - XF
    chains.append(f"[{prev}][{i}:v]xfade=transition=fade:duration={XF}:offset={off:.4f}[x{i}]")
    starts.setdefault(EDL[i][0], round(off + XF / 2, 2))
    prev, total = f"x{i}", off + lengths[i]

run([*inputs, "-filter_complex", ";".join(chains), "-map", f"[{prev}]",
     "-c:v", "libx264", "-profile:v", "high", "-preset", "slow", "-crf", "25",
     "-pix_fmt", "yuv420p", "-movflags", "+faststart", "-an", OUT])
print(f"length {total:.2f}s")
for k, v in starts.items():
    print(f"{k:10s} {v:6.2f}")
