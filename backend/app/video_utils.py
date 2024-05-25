ALLOWED_EXTENSIONS = ['mp4']


def is_allowed_video(filename: str):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

