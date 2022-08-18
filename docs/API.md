
> 작성일 : 2022-08-12

| 설명              | 경로                            | Body 유무 |  Bearer 토큰 필요 | 담당자 |
| :---------------  | :----------------------------- | :-------- | :---------------- | :---- |
| 로그인 요청       | POST /api/user/login            | O         | -                | @soularofdawn @codeing999 |
| 회원가입          | POST /api/user/signup           | O         | -                | @hanbaek-Lee |
| 이메일 중복 검사  | GET /api/user/email/?email=| -         | -                | @hanbaek-Lee |
| 액세스 토큰 재발급| POST /api/user/token            | -         | -                | @soularofdawn |
| 로그아웃 요청     | DELETE /api/user/logout         | -         | -                | @soularofdawn |
| 암호 재발급       | PATCH /api/user/lostPassword    | O         | -                | @soularofdawn
| 회원 정보 조회    | GET /api/user/me                | -         | O                | @soularofdawn @hanbaek-Lee |
| 회원 정보 수정    | PUT /api/user/me                | O         | O                | @soularofdawn @hanbaek-Lee |
| 회원 탈퇴         | GET /api/user/me                | O         | O                | @soularofdawn|
| 암호 확인         | GET /api/user/password/?password=| -         | O                | @soularofdawn
| 게시글 작성       | POST /api/post                  | O         | O                | @oddythecreative |
| 게시글 전체 조회  | GET /api/post?offset=(0,1,2...) | -         | -                |  @oddythecreative |
| 게시글 조회       | Get /api/post/:postId           | -         | -                | @oddythecreative |
| 게시글 수정       | PUT /api/post/:postId           | O         | O                | @oddythecreative |
| 게시글 삭제       | DELETE /api/post/:postId        | -         | O                | @oddythecreative @codeing999 |
| 댓글 조회         | GET /api/comment/:postId        | -         | -                | @codeing999 |
| 댓글 작성         | POST /api/comment/:postId       | O         | O                | @codeing999 |
| 댓글 수정         | PUT /api/comment/:commentId     | O         | O                | @codeing999 |
| 댓글 삭제         | DELETE /api/comment/:commentId  | -         | O                | @codeing999 |
