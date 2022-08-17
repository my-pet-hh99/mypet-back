
> 작성일 : 2022-08-12

| 설명              | 경로                            | Body 유무 |  Bearer 토큰 필요 | 담당자 |
| :---------------  | :----------------------------- | :-------- | :---------------- | :---- |
| 로그인 요청       | POST /api/user/login            | O         | -                |  |
| 회원가입          | POST /api/user/signup           | O         | -                | @hanbaek-Lee |
| 아이디 중복 검사  | GET /api/user/idCheck/:username | O         | -                | @hanbaek-Lee |
| 액세스 토큰 발급  | POST /api/user/token            | -         | -                |  |
| 로그아웃          | GET /api/user/logout            | -         | -                |  |
| 사진 업로드       | POST /api/image                 | O         | O                |  |
| 게시글 작성       | POST /api/post                  | O         | O                | @oddythecreative |
| 게시글 전체 조회  | GET /api/post?offset=(0,1,2...) | -         | -                |  @oddythecreative |
| 게시글 조회       | Get /api/post/:postId           | -         | -                | @oddythecreative |
| 게시글 수정       | PUT /api/post/:postId           | O         | O                | @oddythecreative |
| 게시글 삭제       | DELETE /api/post/:postId        | -         | O                | @oddythecreative |
| 댓글 조회         | GET /api/comment/:postId        | -         | -                | @codeing999 |
| 댓글 작성         | POST /api/comment/:postId       | O         | O                | @codeing999 |
| 댓글 수정         | PUT /api/comment/:commentId      | O         | O               | @codeing999 |
| 댓글 삭제         | DELETE /api/comment/:commentId  | -         | O                | @codeing999 |
